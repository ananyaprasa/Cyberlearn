import { useParams } from "react-router-dom";
import CryptoSymmetric from "./CryptoSymmetric";
import CryptoAsymmetric from "./CryptoAsymmetric";
import CryptoHashing from "./CryptoHashing";
import CryptoSignatures from "./CryptoSignatures";

function CryptographyDetail() {
  const { lessonId } = useParams();

  // Route to specific cryptography topic pages based on ID
  switch (lessonId) {
    case '6999e774551877fbe2fed8fb':
      return <CryptoSymmetric />;
    case '6999e758551877fbe2fed8f9':
      return <CryptoAsymmetric />;
    case '6999e747551877fbe2fed8f7':
      return <CryptoHashing />;
    case '6999e787551877fbe2fed8fd':
      return <CryptoSignatures />;
    default:
      return (
        <div style={{ padding: "2rem", minHeight: "100vh", background: "#1d3136", color: "white" }}>
          <h1>Cryptography Topic Not Found</h1>
          <p>The requested cryptography topic could not be found.</p>
          <a href="/cryptography" style={{ color: "#00FFC8" }}>← Back to Cryptography</a>
        </div>
      );
  }
}

export default CryptographyDetail;