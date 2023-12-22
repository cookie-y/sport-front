declare interface TForm {
  // eslint-disable-next-line no-unused-vars
  validateField(value: Array<string>, cb: (errorsRes: Array<{ message: string }>) => any): void;
}

export const Form = {
  validateField: (form: TForm, value: Array<string>) => {
    return new Promise((resolve, reject) => {
      form.validateField(value, (errorsRes) => {
        if (errorsRes.length) {
          uni.$u.toast(errorsRes[0].message);
          reject(errorsRes);
        } else {
          resolve(true);
        }
      });
    });
  },
};
