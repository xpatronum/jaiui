import { Layout } from "@/shared/ui";
import Logo from "../../shared/assets/images/upscalemedia-transformed-blue.png";

const Page = () => {
  return (
    <Layout>
      <section className="flex grow flex-col items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          draggable="false"
          style={{ width: "1000px", height: "540px" }}
        />

        <h2
          className="bg-gradient-to-r from-blue-400 to-[#0fe4ea] bg-clip-text text-xl font-semibold text-transparent"
          style={{
            marginTop: "-48px",
          }}
        >
          {/* Designed & Developed by Just Atom */}
          justatom.org
        </h2>
      </section>
    </Layout>
  );
};

export { Page };
