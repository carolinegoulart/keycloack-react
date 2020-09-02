import axios from "axios";
const BASE_URL =
  "https://review-feature-mo-rr70i1-test-api.esfera.site/portal-parceiro/v1/portal/api";

export function getFileModelo() {
  axios({
    url: `${BASE_URL}/file/default`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo_importacao.csv");
    document.body.appendChild(link);
    link.click();
  });
}

export function getFileImport(nome) {
  const headers = {
    responseType: "blob",
    nomeArquivo: nome,
  };

  axios({
    url: `${BASE_URL}/file`,
    method: "GET",
    headers,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", nome.replace(".csv", ".txt.out"));
    document.body.appendChild(link);
    link.click();
  });
}
