/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export namespace APIValidator {
  /**
   * Simple validation for API host format
   * Just check if it's a valid URL with http/https protocol
   */
  export const isValidFormat = (apiHost: string): boolean => {
    if (!apiHost || typeof apiHost !== 'string') {
      return false;
    }

    try {
      const url = new URL(apiHost);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      return false;
    }
  };

  /**
   * Check if the API host is reachable by sending a simple request
   * Any response (including 404, 500, etc.) indicates the host exists
   * Only network-level failures indicate the host doesn't exist
   */
  export const isExist = async (apiHost: string): Promise<boolean> => {
    try {
      // Use AbortController to set a reasonable timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      await fetch(apiHost, {
        method: 'HEAD', // Use HEAD to minimize data transfer
        signal: controller.signal,
        // Disable following redirects to get the actual host response
        redirect: 'manual',
      });

      clearTimeout(timeoutId);

      // Any HTTP response (including errors like 404, 500) means the host exists
      return true;
    } catch (error: any) {
      // Check if it's a timeout/abort error
      if (error.name === 'AbortError') {
        return false;
      }

      // For fetch errors, we need to distinguish between network failures and HTTP errors
      // Network failures (DNS resolution failed, connection refused) mean host doesn't exist
      // HTTP errors (404, 500, etc.) mean host exists but returned an error

      // Unfortunately, fetch doesn't provide detailed error types
      // But we can check if the error is related to network connectivity
      const errorMessage = error.message?.toLowerCase() || '';

      // These patterns typically indicate network-level failures
      const networkFailurePatterns = [
        'network error',
        'connection refused',
        'dns',
        'resolve',
        'timeout',
        'unreachable',
      ];

      const isNetworkFailure = networkFailurePatterns.some((pattern) =>
        errorMessage.includes(pattern)
      );

      // If it's a network failure, host doesn't exist
      // Otherwise, assume host exists but returned an error
      return !isNetworkFailure;
    }
  };
}
