import { v4 as uuidv4 } from 'uuid'

const CAPICOM_CURRENT_USER_STORE = 2
const CAPICOM_MY_STORE = 'My'
const CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2

function CertificateAdjuster() {}

CertificateAdjuster.prototype.checkQuotes = function (str) {
  var result = 0,
    i = 0
  for (i; i < str.length; i++) if (str[i] === '"') result++
  return !(result % 2)
}

CertificateAdjuster.prototype.Print2Digit = function (digit) {
  return digit < 10 ? '0' + digit : digit
}

CertificateAdjuster.prototype.GetCertDate = function (paramDate) {
  var certDate = new Date(paramDate)
  return (
    this.Print2Digit(certDate.getUTCDate()) +
    '.' +
    this.Print2Digit(certDate.getUTCMonth() + 1) +
    '.' +
    certDate.getFullYear() +
    ' ' +
    this.Print2Digit(certDate.getUTCHours()) +
    ':' +
    this.Print2Digit(certDate.getUTCMinutes()) +
    ':' +
    this.Print2Digit(certDate.getUTCSeconds())
  )
}

CertificateAdjuster.prototype.extract = function (from, what) {
  var certName = ''
  const lenWhat = what.length
  var begin = from.indexOf(what) + lenWhat
  if (begin >= 0) {
    var end = from.indexOf(', ', begin)
    while (end > 0) {
      if (this.checkQuotes(from.substr(begin, end - begin))) break
      end = from.indexOf(', ', end + 1)
    }
    certName = end < 0 ? from.substr(begin) : from.substr(begin, end - begin)
  }

  return certName
}

CertificateAdjuster.prototype.GetCertIssuer = function (certIssuerName) {
  return this.extract(certIssuerName, 'CN=')
}

CertificateAdjuster.prototype.GetCertValidDate = function (certFromDate, certToDate) {
  return 'с' + this.GetCertDate(certFromDate) + ' по ' + this.GetCertDate(certToDate)
}

CertificateAdjuster.prototype.GetCertFio = function (certSubjectName) {
  return this.extract(certSubjectName, 'SN=') + ' ' + this.extract(certSubjectName, 'G=')
}

// CertificateAdjuster.prototype.GetCertInfoString = function (certSubjectName, certFromDate, certToDate, certIssuerName) {
//   const fio = 'Фио: ' + this.extract(certSubjectName, 'SN=') + ' ' + this.extract(certSubjectName, 'G=')
//   const issuer = 'Выдал: ' + this.extract(certIssuerName, 'CN=')
//   const dt = 'Действует с ' + this.GetCertDate(certFromDate) + ' по ' + this.GetCertDate(certToDate)
//   return `${fio}<br />${dt}<br />${issuer}<br />`
// }

export const checkPrivateKey = (certificate, setError, setData, setAuth) => {
  cadesplugin.async_spawn(
    function* (args) {
      const { data, thumb, subject, fromDate, toDate, issuerName } = args[0]
      const hasPrivateKey = yield data.HasPrivateKey()
      if (hasPrivateKey) {
        const oPrivateKey = yield data.PrivateKey
        const sProviderName = yield oPrivateKey.ProviderName
        try {
          const sPrivateKeyLink = yield oPrivateKey.UniqueContainerName
          const validator = yield data.IsValid()
          const certIsValid = yield validator.Result
          if (sPrivateKeyLink && certIsValid) {
            setData({ thumb, subject, fromDate, toDate, issuer: issuerName })
            setAuth('crt')
            // fetch(args[2], { method: 'POST', body: JSON.stringify(args[1]) })
            //   .then(async (response) => {
            //     const result = await response.json()
            //     //console.log(result)
            //     if (!result.user || result.error) {
            //       showError('Ошибка: ' + result.msg, 'F')
            //     } else {
            //       window.location.href = '../php/main.php?t=' + new Date()
            //     }
            //   })
            //   .catch((err) => {
            //     showError('Ошибка: ' + err, 'F')
            //   })
          } else {
            setError('Ошибка: закрытый ключ не прошел проверку')
          }
        } catch (e) {
          setError('Ошибка: ' + cadesplugin.getLastError(e))
        }
      } else {
        setError('Ошибка: закрытый ключ не найден')
      }
    },
    certificate,
    setError,
    setData,
    setAuth
  )
}

export const createListCrt = ({ setList, setError }) => {
  cadesplugin.async_spawn(function* () {
    try {
      const listValidCrt = []
      const oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store')
      let storeExists = true
      if (oStore) {
        yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE, CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)
      } else {
        storeExists = false
        setError('Ошибка при открытии хранилища сертификатов')
      }

      if (storeExists) {
        try {
          const certs = yield oStore.Certificates
          const countCerts = yield certs.Count
          for (let i = 1; i <= countCerts; i++) {
            const cert = yield certs.Item(i)
            const thumbprint = yield cert.Thumbprint
            const validFromDate = new Date(yield cert.ValidFromDate)
            const validToDate = new Date(yield cert.ValidToDate)
            const isValid = validToDate > Date.now()
            const subjectName = yield cert.SubjectName
            const issuerName = yield cert.IssuerName

            // const subjectInfo = new CertificateAdjuster().GetCertInfoString(subjectName, validFromDate, validToDate, issuerName)
            const fio = new CertificateAdjuster().GetCertFio(subjectName)
            const valid = new CertificateAdjuster().GetCertValidDate(validFromDate, validToDate)
            const issuer = new CertificateAdjuster().GetCertIssuer(issuerName)
            if (isValid) {
              const MAX_CRT = 1
              for (let j = 1; j <= MAX_CRT; j++) {
                listValidCrt.push({
                  id: uuidv4(),
                  thumb: thumbprint,
                  fio,
                  valid,
                  issuer,
                  subject: subjectName,
                  issuerName: issuerName,
                  fromDate: validFromDate,
                  toDate: validToDate,
                  data: cert,
                })
              }
            }
          }
          listValidCrt.length > 0 && setList(listValidCrt)
        } catch (ex) {
          setError('Ошибка: ' + cadesplugin.getLastError(ex))
          return
        }
        yield oStore.Close()
      }
    } catch (ex) {
      setError('Ошибка при открытии хранилища сертификатов')
    }
  })
}
// const createListCrt = () => {
//   cadesplugin.async_spawn(function* () {
//     try {
//       const oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store')
//       let storeExists = true

//       if (oStore) {
//         yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE, CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)
//       } else {
//         storeExists = false
//         showError('Ошибка при открытии хранилища сертификатов', 'F')
//       }

//       if (storeExists) {
//         try {
//           const certs = yield oStore.Certificates
//           const countCerts = yield certs.Count
//           for (let i = 1; i <= countCerts; i++) {
//             try {
//               const cert = yield certs.Item(i)

//               try {
//                 const thumbprint = yield cert.Thumbprint
//                 try {
//                   const validFromDate = new Date(yield cert.ValidFromDate)
//                   const validToDate = new Date(yield cert.ValidToDate)
//                   const isValid = validToDate > Date.now()
//                   const subjectName = yield cert.SubjectName
//                   const issuerName = yield cert.IssuerName

//                   const subjectInfo = new CertificateAdjuster().GetCertInfoString(subjectName, validFromDate, validToDate, issuerName)
//                   if (isValid) {
//                     const MAX_CRT = 1
//                     for (let j = 1; j <= MAX_CRT; j++) {
//                       const container = document.querySelector('.container-certificate')
//                       const containerCrt = document.createElement('div')
//                       containerCrt.className = 'crt'
//                       containerCrt.innerHTML = `${subjectInfo} Hash: ${thumbprint}`
//                       containerCrt.dataset.thumb = thumbprint
//                       containerCrt.dataset.subject = subjectName
//                       containerCrt.dataset.issuer = issuerName
//                       containerCrt.dataset.fromDate = validFromDate
//                       containerCrt.dataset.toDate = validToDate
//                       container.appendChild(containerCrt)

//                       containerCrt.addEventListener('click', ({ target }) => {
//                         const url = './php/authCrt.php'
//                         const data = {
//                           thumb: target.dataset.thumb,
//                           subject: target.dataset.subject,
//                           issuer: target.dataset.issuer,
//                           fromDate: target.dataset.fromDate,
//                           toDate: target.dataset.toDate,
//                         }
//                         //console.log(data)

//                         checkPrivateKey(cert, data, url)
//                       })
//                     }
//                   }
//                 } catch (ex) {
//                   showError('Ошибка: ' + cadesplugin.getLastError(ex), 'F')
//                 }
//               } catch (ex) {
//                 showError('Ошибка: ' + cadesplugin.getLastError(ex), 'F')
//               }
//             } catch (ex) {
//               showError('Ошибка: ' + cadesplugin.getLastError(ex), 'F')
//               return
//             }
//           }
//         } catch (ex) {
//           showError('Ошибка: ' + cadesplugin.getLastError(ex), 'F')
//           return
//         }
//         yield oStore.Close()
//       }
//     } catch (ex) {
//       console.log(2)
//       showError('Ошибка при открытии хранилища сертификатов', 'F')
//     }
//   })
// }
