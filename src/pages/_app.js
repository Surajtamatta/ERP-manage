import "@/styles/globals.css";
import { ModalProvider } from '../context/modalContext';
import Modal from "@/components/modal";
export default function App({ Component, pageProps }) {
  return <ModalProvider>
    <Component {...pageProps} />;
    <Modal />
  </ModalProvider>
  
}
