export default function validateInfoPoll(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Insere o teu nome";
  }
  if (!values.email) {
    errors.email = "Insere o teu email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email inválido";
  }

  return errors;
}
