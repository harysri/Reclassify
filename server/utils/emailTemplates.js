// password reset template
const getPasswordResetTemplate = (otp) => {
  return `
    <div style="margin:0;padding:0;background-color:#fcfdfa;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fcfdfa;">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">
              
              <!-- Brand Badge -->
              <tr>
                <td align="center" style="padding-bottom:28px;">
                  <div style="display:inline-block;background:#ffffff;border:3px solid #064e3b;padding:10px 24px;">
                    <span style="font-size:13px;font-weight:900;color:#064e3b;letter-spacing:3px;text-transform:uppercase;">Re-classify</span>
                  </div>
                </td>
              </tr>

              <!-- Main Card -->
              <tr>
                <td style="background-color:#ffffff;border:4px solid #064e3b;">
                  
                  <!-- Card Header -->
                  <div style="background-color:#ecfdf5;border-bottom:4px solid #064e3b;padding:36px 24px;text-align:center;">
                    <h1 style="margin:0;font-size:32px;font-weight:900;color:#064e3b;letter-spacing:-1px;text-transform:uppercase;line-height:1;">
                      Reset Password
                    </h1>
                    <p style="margin:12px 0 0;font-size:16px;color:#059669;font-weight:700;">
                      Verify your identity to continue
                    </p>
                  </div>

                  <!-- Card Body -->
                  <div style="padding:40px 32px;">
                    <p style="margin:0 0 24px;font-size:16px;color:#064e3b;line-height:1.6;font-weight:500;">
                      Hello,<br>
                      You requested a password reset. Use the 6-digit code below to proceed. This code expires in <strong style="color:#059669;">10 minutes</strong>.
                    </p>

                    <!-- OTP Block -->
                    <div style="background-color:#f0fdf4;border:3px solid #064e3b;padding:32px 24px;text-align:center;margin:32px 0;">
                      <p style="margin:0 0 12px;font-size:11px;font-weight:800;color:#059669;text-transform:uppercase;letter-spacing:2px;">
                        Security Code
                      </p>
                      <div style="font-size:48px;font-weight:900;color:#064e3b;letter-spacing:12px;font-family:'Courier New',Courier,monospace;">
                        ${otp}
                      </div>
                    </div>

                    <p style="margin:24px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">
                      Didn't request this? No problem — you can safely ignore this email. Your account remains secure.
                    </p>
                  </div>

                  <!-- Card Footer -->
                  <div style="background-color:#ecfdf5;border-top:4px solid #064e3b;padding:24px 32px;text-align:center;">
                    <p style="margin:0;font-size:13px;color:#064e3b;font-weight:700;">
                      Need help? <a href="mailto:support@re-classify.com" style="color:#059669;text-decoration:underline;font-weight:800;">Contact Support</a>
                    </p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding-top:28px;">
                  <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;font-weight:500;">
                    &copy; Re-classify. Redefining waste for a better world.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
};

module.exports = {
  getPasswordResetTemplate,
};
