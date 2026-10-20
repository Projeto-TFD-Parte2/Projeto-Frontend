/**
 * Mascara o CPF colocando caracteres 'X' nos três primeiros caracteres
 * da esquerda e nos dois últimos da direita.
 * Exemplo: 12345678901 -> XXX.456.789-XX
 */
export function mascararCpf(cpf?: string | null): string {
  if (!cpf) return "-";

  const apenasDigitos = cpf.replace(/\D/g, "");

  if (apenasDigitos.length === 11) {
    return `XXX.${apenasDigitos.slice(3, 6)}.${apenasDigitos.slice(6, 9)}-XX`;
  }

  // Fallback para strings com tamanhos ou formatos diferentes
  if (cpf.length >= 5) {
    return `XXX${cpf.slice(3, -2)}XX`;
  }

  return cpf;
}
