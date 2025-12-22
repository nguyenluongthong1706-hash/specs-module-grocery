// src/utils/formatCurrency.tsx

/**
 * Định dạng số thành tiền tệ Việt Nam (VND)
 * @param amount - Số tiền cần định dạng (kiểu number)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}