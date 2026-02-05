import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, CheckCircle, AlertTriangle, XCircle, Zap } from 'lucide-react';

export const ScannerGuide = () => {
  return (
    <div className="space-y-6">
      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Hur E-ämnen Scannern fungerar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">1. Ta foto</h3>
              <p className="text-sm text-muted-foreground">
                Fotografera ingredienslistan på förpackningen
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">2. AI-analys</h3>
              <p className="text-sm text-muted-foreground">
                AI läser texten och identifierar E-ämnen automatiskt
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">3. Riskbedömning</h3>
              <p className="text-sm text-muted-foreground">
                Få en överblick över säkerheten för varje E-ämne
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips för bästa resultat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Gör så här
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Håll kameran stadigt och i fokus
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Se till att hela ingredienslistan syns
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Använd bra belysning, helst dagsljus
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Zooma in på ingredienslistan om möjligt
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  Ta fotot rakt ovanifrån (90° vinkel)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Undvik detta
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Suddiga eller oskarpa bilder
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Skuggor över texten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Reflexer från plast eller glas
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  För liten text (zooma in istället)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  Vriden eller snedvinklat foto
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Levels Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Förstå riskbedömningen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div>
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Låg risk
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Generellt säkra E-ämnen som är godkända för daglig konsumtion
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Måttlig risk
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  E-ämnen som bör konsumeras med måtta eller kan orsaka reaktioner hos vissa personer
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div>
                <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                  Hög risk
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  E-ämnen som bör undvikas eller konsumeras mycket sparsamt
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Tekniska krav
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Stödda filformat</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• JPEG (.jpg, .jpeg)</li>
                <li>• PNG (.png)</li>
                <li>• WebP (.webp)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Filstorlek</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Max 20MB per bild</li>
                <li>• Rekommenderat: 1-5MB</li>
                <li>• Minst 800x600 pixlar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};