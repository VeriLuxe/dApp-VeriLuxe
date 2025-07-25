import { Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 animate-gradient-pulse">
      <div className="relative flex items-center justify-center">
        <Shield className="h-24 w-24 text-yellow-400 animate-bounce-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border-4 border-yellow-300 border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-gray-900">
        Loading VeriLuxe...
      </h2>
      <p className="text-gray-600 mt-2">
        Authenticating your luxury experience
      </p>
    </div>
  );
}
