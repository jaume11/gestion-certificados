import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JiraUser, Certificate } from '../models.interface';
import { Base64 } from "js-base64";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  certificates: Array<Certificate>;
  certificate: Certificate;
  id: string;
  userName: string;
  urlJira = 'api/jira/';
  urlCertif = 'api/certificates/';
  data: JiraUser;
  jwt: string = localStorage.getItem('jwt');
  options = { headers: { Authorization: `Bearer ${this.jwt}` } };
  headerJira = { headers: { 'User-Agent': 'xx' } };

  constructor(private http: HttpClient) { }

  getJiraUser() {
    this.id = localStorage.getItem('id');
    return this.http.get(this.urlJira + `${this.id}`).toPromise();
  }
  getUserName() {
    return this.userName = localStorage.getItem('userName');
  }
  // actualizar usuario jira
  updateJiraUser(updateJira) {
    console.error;
    return this.http.put(this.urlJira + localStorage.getItem('id'), updateJira).toPromise();
  }
  // traer certificados
  loadCertificates() {
    return this.http.get(this.urlCertif, this.options).toPromise().then((resCertificate: any) => {
      this.certificates = resCertificate;
      return this.certificates;
    }).catch(() => {
      (console.error)
    });;
  }

  getOneCertificate() {
    let id = localStorage.getItem('idCert');
    return this.http.get(this.urlCertif + id, this.options).toPromise();
  }

  // actualizar certificados completados
  updateCertCompletado(cert, certId) {
    return this.http.put(this.urlCertif + `${certId}`, cert, this.options).toPromise().then((result) => {
    })
      .catch(console.error);
  }

  postCertCifrado(cifrado, alias, password, id_orga, repositorio_url, integration_list,
    observaciones, contacto_renovacion, nombre_archivo) {
    let nombre_cliente = id_orga;

    const body = {
      alias, password, id_orga, nombre_cliente, repositorio_url, contacto_renovacion,
      integration_list, observaciones, cifrado, nombre_archivo
    };

    return this.http.post(this.urlCertif, body, this.options).toPromise();
  }

  downloadCertificate(certificate: Certificate) {
    let certificateType = certificate.alias;
    let contentType = "file/" + certificateType;
    let byteCharacters = atob(certificate.cifrado);
    let byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], {
      type: contentType
    });

    let newFile = document.createElement("a");
    newFile.href = URL.createObjectURL(blob);
    newFile.download = `${certificate.nombre_archivo}`;
    document.body.appendChild(newFile);
    newFile.click();
  }

  postTicketJira(certificate) {
    let objJsonB64 = Base64.encode('evarist.jaume@gmail.com' + ':' + '12345678');

    const optionsJira = { headers: { Authorization: `Basic ${objJsonB64}`, 'User-Agent': 'xx'  } }

    const body = {
      fields: {
        project:
        {
          key: "CER"
        },
        summary: "Certificado: " + certificate.id + " va a caducar. Alias: " + certificate.alias,
        description: certificate.observaciones,
        issuetype: {
          name: "Epic"
        }
      }
    }
    
    return this.http.post('/rest/api/2/issue', body, optionsJira).toPromise();
  }

  loginJira(){
    let username = 'evarist.jaume@gmail.com';
    let password = '12345678';
    const body = { username, password };
    
    return this.http.post('/rest/auth/1/session/', body, this.headerJira).toPromise();
  }
}
