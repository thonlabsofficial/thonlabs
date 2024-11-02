import { UpdateEmailTemplatePayload } from '@/_validators/emails-validators';

const shouldIncludeUnit = ['padding'];

export function parseHtmlTemplate(
  content: string,
  bodyStyles: UpdateEmailTemplatePayload['bodyStyles'],
) {
  let bodyInlineStyles = '';

  Object.entries(bodyStyles).forEach(([key, value]) => {
    bodyInlineStyles += `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value}${shouldIncludeUnit.includes(key) ? 'px' : ''};`;
  });

  return [
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    '<html>',
    '<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"><% if (preview) { %><%= preview %><div style="display:none;opacity:0;overflow:hidden;height:0;width:0;max-height:0;max-width:0;font-size:1px;line-height:1px">‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ </div><% } %></div>',
    '<head>',
    '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
    '</head>',
    `<body style="font-family:sans-serif;margin:0px;${bodyInlineStyles}">`,
    content,
    '</body>',
    '</html>',
  ].join('');
}
