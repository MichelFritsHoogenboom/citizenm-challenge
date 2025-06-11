import type { Rate } from "~/types/rates";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event): Promise<{ data: Rate[] }> => {
  try {
    const rates = getRates();
    if (!rates || !Array.isArray(rates)) {
      throw new Error("Invalid rates data format");
    }
    return { data: rates };
  } catch (error) {
    console.error("Error in rates endpoint:", error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : "Failed to fetch rates",
      cause: error,
    });
  }
});
