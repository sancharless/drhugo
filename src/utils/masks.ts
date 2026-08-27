/**
 * Utilitários de máscaras e formatação
 */

// Máscara brasileira de telefone: (99) 99999-9999 ou (99) 9999-9999
export function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Limpa string deixando apenas dígitos
export function cleanDigits(value: string): string {
  return value.replace(/\D/g, '');
}

// Validador simples de telefone com DDD brasileiro
export function isValidBrazilianPhone(value: string): boolean {
  const digits = cleanDigits(value);
  // Deve ter 10 (fixo) ou 11 (celular) dígitos e DDD válido (> 10)
  if (digits.length !== 10 && digits.length !== 11) return false;
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;
  return true;
}
