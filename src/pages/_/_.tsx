import { Layout } from "@/shared/ui";
import Logo from '../../shared/assets/images/upscalemedia-transformed-blue.png';

const Page = () => {
  return (
    <Layout>
      <section className="flex grow flex-col items-center justify-center">
        <img 
          src={Logo} 
          alt="Logo" 
          style={{ width: '1000px', height: '540px' }}
        />

        <h2 
          className="bg-gradient-to-r from-white from-25% to-[#0fe4ea] bg-clip-text text-2xl font-semibold text-transparent"
          style={{
            marginTop: '-32px'
          }}
        >
          Designed & Developed by Just Atom
        </h2>
      </section>
    </Layout>
  );
};

export { Page };
