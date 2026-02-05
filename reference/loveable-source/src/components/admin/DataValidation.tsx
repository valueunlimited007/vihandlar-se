import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Info, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * DATA VALIDATION COMPONENT - ARCHIVED
 * 
 * This component was moved from the live Features page to keep the site clean
 * for end users while preserving the development functionality.
 * 
 * USAGE:
 * - Access via hidden admin route: /admin
 * - Can be imported for development/debugging purposes
 * - Contains data validation and automated fixing for E-additives database
 * 
 * LOCATION: src/components/admin/DataValidation.tsx
 * CREATED: For E-additives data quality management
 * ARCHIVED: 2024 - Hidden from live site
 */

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  e_number?: string;
  field?: string;
}

interface ValidationReport {
  summary: {
    total_additives: number;
    published_additives: number;
    total_issues: number;
    errors: number;
    warnings: number;
    info: number;
  };
  issues: ValidationIssue[];
  recommendations: string[];
}

interface FixResult {
  e_number: string;
  fixes_applied: string[];
  success: boolean;
  error?: string;
}

interface DataFixReport {
  summary: {
    total_processed: number;
    successfully_fixed: number;
    failed_fixes: number;
    fixes_by_type: {
      origin_normalized: number;
      risk_score_corrected: number;
      meta_title_trimmed: number;
      meta_description_trimmed: number;
      meta_title_generated: number;
      meta_description_generated: number;
      e150_names_fixed: number;
      adi_inconsistency_fixed: number;
      invalid_e_number_fixed: number;
    };
  };
  results: FixResult[];
}

export const DataValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [fixReport, setFixReport] = useState<DataFixReport | null>(null);

  const runValidation = async () => {
    setIsValidating(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-data');
      
      if (error) {
        throw error;
      }

      setReport(data);
      toast.success('Datavalidering slutförd');
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Fel vid datavalidering');
    } finally {
      setIsValidating(false);
    }
  };

  const runDataFix = async () => {
    setIsFixing(true);
    try {
      const { data, error } = await supabase.functions.invoke('data-fix');
      
      if (error) {
        throw error;
      }

      setFixReport(data);
      toast.success(`Datafix slutförd: ${data.summary.successfully_fixed} poster åtgärdades`);
      
      // Re-run validation to see updated results
      if (report) {
        setTimeout(() => runValidation(), 1000);
      }
    } catch (error) {
      console.error('Data fix error:', error);
      toast.error('Fel vid datafix');
    } finally {
      setIsFixing(false);
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getIssueBadgeVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const categorizeIssues = (issues: ValidationIssue[]) => {
    const errors = issues.filter(issue => issue.type === 'error');
    const warnings = issues.filter(issue => issue.type === 'warning');
    const info = issues.filter(issue => issue.type === 'info');
    
    return { errors, warnings, info };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Datavalidering System
          </CardTitle>
          <CardDescription>
            Kontrollera kvaliteten på E-ämnes data i databasen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              onClick={runValidation} 
              disabled={isValidating || isFixing}
              className="w-full"
            >
              {isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Validerar data...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Kör datavalidering
                </>
              )}
            </Button>
            
            {report && report.summary.total_issues > 0 && (
              <Button 
                onClick={runDataFix} 
                disabled={isValidating || isFixing}
                variant="secondary"
                className="w-full"
              >
                {isFixing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Åtgärdar problem...
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Åtgärda automatiskt fixbara problem
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {fixReport && (
        <Card>
          <CardHeader>
            <CardTitle>Datafix Resultat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{fixReport.summary.successfully_fixed}</div>
                <div className="text-sm text-muted-foreground">Åtgärdade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{fixReport.summary.fixes_by_type.e150_names_fixed}</div>
                <div className="text-sm text-muted-foreground">E150 Namn Fixade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{fixReport.summary.fixes_by_type.adi_inconsistency_fixed}</div>
                <div className="text-sm text-muted-foreground">ADI Värden Justerade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{fixReport.summary.fixes_by_type.invalid_e_number_fixed}</div>
                <div className="text-sm text-muted-foreground">E-nummer Format Fixade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{fixReport.summary.fixes_by_type.meta_title_generated}</div>
                <div className="text-sm text-muted-foreground">SEO Titlar Genererade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{fixReport.summary.fixes_by_type.meta_description_generated}</div>
                <div className="text-sm text-muted-foreground">SEO Beskrivningar Genererade</div>
              </div>
            </div>
            
            {fixReport.results.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="font-medium">Exempel på åtgärdade problem:</h4>
                {fixReport.results.slice(0, 10).map((result, index) => (
                  <div key={index} className="text-sm p-2 border rounded">
                    <div className="font-medium">{result.e_number}</div>
                    {result.fixes_applied.map((fix, fixIndex) => (
                      <div key={fixIndex} className="text-muted-foreground">• {fix}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {report && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valideringsresultat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{report.summary.total_additives}</div>
                  <div className="text-sm text-muted-foreground">Totalt E-ämnen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{report.summary.published_additives}</div>
                  <div className="text-sm text-muted-foreground">Publicerade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{report.summary.errors}</div>
                  <div className="text-sm text-muted-foreground">Fel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">{report.summary.warnings}</div>
                  <div className="text-sm text-muted-foreground">Varningar</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {report.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Rekommendationer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {report.issues.length > 0 && (() => {
            const { errors, warnings, info } = categorizeIssues(report.issues);
            
            return (
              <div className="space-y-4">
                {errors.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Kritiska fel ({errors.length})
                      </CardTitle>
                      <CardDescription>
                        Dessa problem måste åtgärdas omedelbart
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {errors.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={getIssueBadgeVariant(issue.type)}>
                                  {issue.category}
                                </Badge>
                                {issue.e_number && (
                                  <Badge variant="outline">{issue.e_number}</Badge>
                                )}
                                {issue.field && (
                                  <Badge variant="outline">{issue.field}</Badge>
                                )}
                              </div>
                              <p className="text-sm">{issue.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {warnings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-yellow-700 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Möjliga stavfel ({warnings.length})
                      </CardTitle>
                      <CardDescription>
                        Dessa namn kan behöva granskas manuellt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {warnings.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={getIssueBadgeVariant(issue.type)}>
                                  {issue.category}
                                </Badge>
                                {issue.e_number && (
                                  <Badge variant="outline">{issue.e_number}</Badge>
                                )}
                                {issue.field && (
                                  <Badge variant="outline">{issue.field}</Badge>
                                )}
                              </div>
                              <p className="text-sm">{issue.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {info.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Informativa meddelanden ({info.length})
                      </CardTitle>
                      <CardDescription>
                        Liknande kemiska föreningar - detta är normalt och hjälper att identifiera potentiellt förvirrande namn
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {info.slice(0, 20).map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={getIssueBadgeVariant(issue.type)}>
                                  {issue.category}
                                </Badge>
                                {issue.e_number && (
                                  <Badge variant="outline">{issue.e_number}</Badge>
                                )}
                                {issue.field && (
                                  <Badge variant="outline">{issue.field}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{issue.message}</p>
                            </div>
                          </div>
                        ))}
                        {info.length > 20 && (
                          <div className="text-center text-sm text-muted-foreground py-2">
                            ... och {info.length - 20} till
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};