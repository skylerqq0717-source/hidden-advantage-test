(() => {
  const messages = {
    INVALID_CODE: '密码不正确、已停用或已过期，请检查后重试。',
    QUOTA_EXHAUSTED: '这个密码的 3 次机会已用完，请联系客服获取新的密码。',
    INVALID_REQUEST: '请求未能验证，请刷新页面后重试。',
    INVALID_ATTEMPT: '本次测评无法验证，请联系客服。',
    INCOMPLETE_ANSWERS: '请完成全部 48 道题后再提交。',
    RESULT_NOT_FOUND: '没有找到这个结果，链接可能已失效。'
  };
  async function rpc(name, payload) {
    const config = window.APP_CONFIG || {};
    if (!config.supabaseUrl || !config.supabasePublishableKey) {
      throw new Error('测评服务尚未配置完成，请稍后再来。');
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const key = config.supabasePublishableKey;
      const headers = { 'Content-Type': 'application/json', apikey: key };
      // Legacy anon keys are JWTs; new publishable keys must not be used as JWTs.
      if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
      const response = await fetch(`${config.supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
        method: 'POST', headers, body: JSON.stringify(payload),
        signal: controller.signal, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer'
      });
      if (!response.ok) throw new Error(response.status === 429
        ? '请求较多，请稍等片刻后重试。' : '测评服务暂时未能响应，请稍后重试。');
      const data = await response.json();
      if (data?.error) {
        const error = new Error(messages[data.error] || '请求未完成，请稍后重试。');
        error.code = data.error;
        throw error;
      }
      return data;
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) {
        throw new Error('网络连接中断，请重试。重试同一次请求不会重复扣次数。');
      }
      throw error;
    } finally { clearTimeout(timer); }
  }
  window.AssessmentAPI = Object.freeze({
    verify: code => rpc('advantage_verify_code', { p_code: code }),
    start: (code, attempt) => rpc('advantage_start_attempt', {
      p_code: code, p_request_id: attempt.id, p_token: attempt.token
    }),
    finish: (attempt, answers) => rpc('advantage_finish_attempt', {
      p_attempt_id: attempt.id, p_token: attempt.token, p_answers: answers
    }),
    result: id => rpc('advantage_get_result', { p_result_id: id })
  });
})();
