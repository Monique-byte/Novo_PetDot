
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

/**
 * Um hook customizado para encapsular chamadas de API, gerenciando
 * estados de carregamento, erro e dados.
 * @param {Function} apiFunc - A função da API a ser chamada (ex: getForms, createForm).
 * @returns {Object} Contém `data`, `loading`, `error`, e a função `request` para executar a chamada.
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      // Normaliza a resposta para encontrar os dados principais
      const responseData = response?.data?.docs || response?.data?.forms || response?.data?.form || response?.data || response;
      setData(responseData);
      return { success: true, data: responseData };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Ocorreu um erro inesperado.';
      setError(errorMessage);
      toast.error(errorMessage); // Exibe o erro como uma notificação
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, request };
};