const defaultStyle = `bg-black text-white font-semibold`;

export const styles = {
  "default": `${defaultStyle}`,
  "wide-half-btn": `${defaultStyle} w-1/2`,
  "wide-btn": `${defaultStyle} w-full`,
  "disabled-wide-btn": `${defaultStyle} w-full opacity-30`,
  "disabled-wide-half-btn": `${defaultStyle} w-1/2 opacity-30`,
  "only-word": `text-black bg-transparent font-semibold hover:underline`,
  "disabled-only-word": `text-gray-default bg-transparent font-semibold`,
};

export const varients = {
  "login-submit-btn": `px-4 py-2 mx-auto rounded-lg border-2 hover:bg-transparent hover:text-black hover:border-dashed`,
  "sign-up-submit-btn": `px-4 py-2 mx-auto rounded-lg border-2 hover:bg-transparent hover:text-black hover:border-dashed`,
};
