import "./about-styles.css";
import Image from "next/image";

const About = () => {
  const branches = [
    {
      branch_name: "Externals",
      branch_abv: "EXT",
      committees: [
        {
          committee_name: "Marketing & Linkegaes",
          committee_abv: "MNL",
        },
        {
          committee_name: "Publicity & Productions",
          committee_abv: "PNP",
        },
        {
          committee_name: "Project Management Team",
          committee_abv: "PMT",
        },
      ],
    },
    {
      branch_name: "Internals",
      branch_abv: "INT",
      committees: [
        {
          committee_name: "Human Resources & Development",
          committee_abv: "HRD",
        },
        {
          committee_name: "Organizational Research & Analysis",
          committee_abv: "ORGRES",
        },
        {
          committee_name: "Activity Monitoring Team",
          committee_abv: "AMT",
        },
      ],
    },
    {
      branch_name: "Operations",
      branch_abv: "OPS",
      committees: [
        {
          committee_name: "Activity Documentations & Management",
          committee_abv: "ADM",
        },
        {
          committee_name: "Activity Processing & Screening",
          committee_abv: "APS",
        },
        {
          committee_name: "Finance",
          committee_abv: "FIN",
        },
      ],
    },
  ];

  const pertinentLinks = [
    {
      header: "PNP",
      links: [
        {
          name: "FAQs",
          url: "bit.ly.PNPFAQs",
        },
      ],
    },
    {
      header: "MNL",
      links: [
        {
          name: "MOAs",
          url: "bit.ly.MOATemplates",
        },
      ],
    },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center gradient-background-light">
      <section className="w-full flex items-center justify-center relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/cso-logo-white.png"
            width={900}
            height={900}
            alt="CSO Logo"
            className="object-contain"
          />
        </div>
        <div className="z-10 w-full md:w-[60%] min-h-screen flex flex-col items-center justify-center md:gap-10">
          <div className="w-full flex flex-col gap-2 items-center p-4 md:p-0">
            <h1 className="w-full text-shadow text-3xl md:text-5xl bg-gradient-to-r from-primary to-secondary font-bold font-[Lexend] uppercase">
              Council of Student Organizations
            </h1>
            <div className="w-full h-23 gradient-background p-1 drop-shadow-lg"></div>
          </div>
          <div className="w-full flex flex-col gap-16 p-4 md:p-0 text-justify">
            <h3 className="text-[#AF9627] text-sm md:text-xl font-semibold">
              The{" "}
              <span className="text-[#866906]">
                Council of Student Organizations (CSO)
              </span>{" "}
              of De La Salle University is the union of the professional,
              special interest, and socio-civic organizations in the university.
              Since 1974, the Council has continuously delivered quality student
              service and produced outstanding student leaders devoted to
              serving the Lasallian community. The council pushes forward with
              its various annual activities to promote Lasallian spirit and
              encourage organizational participation.
            </h3>
            <div className="text-shadow bg-gradient-to-r from-secondary to-neutral-900 font-bold font-[Lexend] uppercase">
              <p>48 Organizations</p>
              <p>9 Executive Teams</p>
              <p>1 CSO</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-10 md:pr-10 flex flex-col gap-10">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="w-full md:w-4/5 py-4 pr-4 md:p-10 bg-gradient-to-r from-[#F6F6EA] to-green-900/60 inner-box-shadow flex justify-between"
          >
            <div className="w-2/5">
              <p className="text-7xl md:text-9xl font-bold md:bg-gradient-to-r md:from-neutral-200 md:to-green-900 bg-gradient-to-r from-neutral-200/30 to-green-900/30 bg-clip-text text-transparent">
                {branch.branch_abv}
              </p>
              <p className="px-4 text-xs md:text-base">{branch.branch_name}</p>
            </div>
            <div className="w-3/5 flex flex-col justify-between">
              {branch.committees.map((comm, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center"
                >
                  <p className="text-xs md:text-xl font-bold bg-gradient-to-r from-black to-[#666666]/30 bg-clip-text text-transparent">
                    {comm.committee_name}
                  </p>
                  <p className="text-xs md:text-6xl font-bold bg-gradient-to-r from-[#CFD4C5] to-[#CFD4C5]/10 bg-clip-text text-transparent">
                    {comm.committee_abv}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section
        id="pertinent-links"
        className="w-full min-h-screen flex flex-col items-center justify-center"
      >
        <div className="w-full p-1 gradient-background"></div>
        <div className="w-full min-h-screen p-24 gradient-background-light shadow-inner">
          <h1 className="w-full flex justify-center text-4xl text-shadow uppercase font-bold bg-black/40">
            Pertinent Links
          </h1>
          <div className="w-full flex flex-col ">
            {pertinentLinks.map((link, key: number) => (
              <div key={key}>
                <p>{link.header}</p>
                {link.links.map((l, key: number) => (
                  <div key={key}>
                    <p>{l.name}</p>
                    <p>{l.url}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-1 gradient-background"></div>
      </section>
      <section
        id="org-structure"
        className="w-full min-h-screen md:p-24 flex items-center justify-center"
      >
        <Image
          src="/org-structure-2.png"
          alt="Org Structure"
          width={1300}
          height={1300}
          className="hidden md:flex"
        />
        <Image
          src="/small-org-structure.png"
          alt="Org Structure"
          width={1300}
          height={1300}
          quality={100}
          className="flex md:hidden"
        />
      </section>
    </main>
  );
};

export default About;
