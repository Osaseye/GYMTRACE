import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { 
  ScanLine, 
  CheckCircle, 
  XCircle, 
  User, 
  Search, 
  Camera,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { recordCheckIn, lookupMember } from '../../services/attendanceService';

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [manualId, setManualId] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState(null);
  const [processing, setProcessing] = useState(false);

  const processScan = async (data) => {
    if (!data || processing) return;
    
    const now = Date.now();
    if (lastScanned && (now - lastScanned < 3000) && scanResult?.status === 'success') {
       return;
    }
    setLastScanned(now);
    setProcessing(true);

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(data.text || data);
      } catch {
        parsedData = { userId: data.text || data };
      }

      const uid = parsedData.userId || parsedData.id;
      if (!uid) throw new Error("Invalid QR Format");

      // Validate QR timestamp (reject if older than 90 seconds)
      if (parsedData.timestamp) {
        const age = (Date.now() - parsedData.timestamp) / 1000;
        if (age > 90) throw new Error("QR Code expired");
      }

      // Look up member in Firestore
      const member = await lookupMember(uid);
      if (!member) throw new Error("Member not found");

      // Record check-in
      await recordCheckIn(uid, member.name);

      setScanResult({
        status: 'success',
        member: {
          name: member.name,
          id: uid.slice(0, 12),
          status: member.status || "Active",
          plan: "Member",
          photoUrl: null,
        }
      });
      toast.success(`Access Granted: ${member.name}`);
    } catch (err) {
      setScanResult({
        status: 'error',
        message: err.message || "Invalid QR Code format"
      });
      toast.error(err.message || "Invalid QR Code");
    } finally {
      setProcessing(false);
    }
  };

  const handleError = (err) => {
    // Specific error handling can be done here.
    // 'Permissions denied' etc.
    console.error(err);
    // Don't show toast on every frame read error, only major ones
    if (err.name === 'NotAllowedError') {
        setError("Camera permission denied");
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualId.trim()) return;
    
    // Use the manual ID directly as userId
    processScan(JSON.stringify({ userId: manualId.trim() }));
    setManualId("");
  };

  const resetScan = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Check-in Scanner</h1>
        <p className="text-slate-500">Scan member QR codes or manually enter ID</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: SCANNER & RESULT */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Scanner Container */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative aspect-video flex items-center justify-center">
                {isScanning && !scanResult ? (
                    <div className="w-full h-full relative">
                        <Scanner
                            onScan={(result) => {
                                if (result && result.length > 0) {
                                    processScan(result[0].rawValue);
                                }
                            }}
                            onError={(error) => {
                                if (error) handleError(error);
                            }}
                            styles={{ 
                                container: { width: '100%', height: '100%', objectFit: 'cover' } 
                            }}
                            components={{
                                audio: false,
                                finder: false // Using our own overlay below
                            }}
                        />
                        {/* Overlay Guide */}
                        <div className="absolute inset-0 border-2 border-white/30 m-12 rounded-xl pointer-events-none flex items-center justify-center">
                            <div className="w-64 h-64 border-2 border-emerald-500/50 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
                            Point camera at QR Code
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-8 text-center">
                        {scanResult?.status === 'success' ? (
                            <div className="bg-emerald-500/10 p-6 rounded-full border border-emerald-500/20 mb-4 animate-in zoom-in spin-in-6 duration-300">
                                <CheckCircle size={64} className="text-emerald-500" />
                            </div>
                        ) : (
                            <div className="bg-red-500/10 p-6 rounded-full border border-red-500/20 mb-4 animate-in zoom-in duration-300">
                                <XCircle size={64} className="text-red-500" />
                            </div>
                        )}
                        <h3 className={`text-2xl font-bold mb-2 ${scanResult?.status === 'success' ? 'text-white' : 'text-red-400'}`}>
                            {scanResult?.status === 'success' ? 'Access Granted' : 'Access Denied'}
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {scanResult?.status === 'success' 
                                ? `${scanResult.member.name} has been successfully checked in.` 
                                : scanResult?.message || "Invalid QR Code"}
                        </p>
                        <button 
                            onClick={resetScan}
                            className="bg-white text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                        >
                            <ScanLine size={18} />
                            Scan Next Member
                        </button>
                    </div>
                )}

                {error && !scanResult && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-20 p-8 text-center">
                         <div className="max-w-sm">
                            <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">Camera Error</h3>
                            <p className="text-slate-400 text-sm">{error}</p>
                            <p className="text-slate-500 text-xs mt-4">Check permissions or use manual entry.</p>
                         </div>
                    </div>
                )}
            </div>

             {/* Recent/Current Scan Details Card */}
             {scanResult?.status === 'success' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                            {scanResult.member.photoUrl ? (
                                <img src={scanResult.member.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User size={32} />
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{scanResult.member.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                                    {scanResult.member.status}
                                </span>
                                <span className="text-slate-500">• {scanResult.member.plan}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">ID Number</p>
                        <p className="font-mono text-slate-700 font-medium">{scanResult.member.id}</p>
                    </div>
                </div>
            )}

        </div>

        {/* RIGHT COLUMN: MANUAL ENTRY & STATS */}
        <div className="space-y-6">
            
            {/* Manual Entry */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Search size={18} className="text-slate-400" />
                    Manual Check-in
                </h3>
                <form onSubmit={handleManualSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-500 mb-1.5">Member ID</label>
                        <input 
                            type="text" 
                            value={manualId}
                            onChange={(e) => setManualId(e.target.value)}
                            placeholder="Enter ID (e.g. MEM-001)"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={!manualId.trim()}
                        className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Check In
                    </button>
                </form>
            </div>

            {/* Quick Stats/Info */}
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 mb-2">Scanner Tips</h3>
                <ul className="space-y-2 text-sm text-emerald-700/80">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        Ensure proper lighting for faster scanning.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        Hold the device steady and parallel to the code.
                    </li>
                    <li className="flex items-start gap-2">
                         <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        If camera fails, check browser permissions.
                    </li>
                </ul>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
