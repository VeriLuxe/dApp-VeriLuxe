import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Hash,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Certificate {
  id: string;
  owner: string;
  metadataHash: string;
  isValid: boolean;
  issueDate: string;
  productType: string;
}

interface CertificatesListProps {
  certificates: Certificate[];
}

export function CertificatesList({ certificates }: CertificatesListProps) {
  return (
    <div className="space-y-4">
      {certificates.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No certificates found</p>
      ) : (
        certificates.map((cert) => (
          <Card
            key={cert.id}
            className="border-l-4 border-l-rose-200 bg-white shadow-sm"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="font-mono border-gray-300 text-gray-700"
                    >
                      {cert.id}
                    </Badge>
                    <Badge
                      className={
                        cert.isValid
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {cert.isValid ? "Valid" : "Revoked"}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Owner: {cert.owner.slice(0, 20)}...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span>Hash: {cert.metadataHash.slice(0, 20)}...</span>
                    </div>
                    {cert.productType && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>Product: {cert.productType}</span>
                      </div>
                    )}
                    {cert.issueDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Issued: {cert.issueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                {cert.isValid ? (
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
