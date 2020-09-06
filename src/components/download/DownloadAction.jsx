import axios from "axios";
const BASE_URL = "https://test-api.esfera.site/portal-parceiro/v1/portal/api";

export default function getFileImport(nome) {
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
