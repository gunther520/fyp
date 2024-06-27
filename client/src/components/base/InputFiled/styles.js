const defaultStyle =
  "block w-full px-4 py-2 mt-2 rounded-md shadow-md placeholder-light-slate outline-none";

export const styles = {
  default: `${defaultStyle} bg-white`,
  "no-error": `${defaultStyle} bg-white border-2 border-black focus:border focus:ring-4 focus:ring-blue-light ring-offset`,
  error: `${defaultStyle} border border-black ring-2 focus:ring-4 ring-warning-red-heavy ring-offset bg-warning-red-light`,
};
