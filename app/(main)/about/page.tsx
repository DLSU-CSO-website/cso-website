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
    <main className="w-full min-h-screen py-10 flex flex-col items-center justify-center gradient-background-light">
      <section className="section1 relative overflow-hidden">
        <Image
          width={900}
          height={700}
          src="/cso-logo-white.png"
          alt="CSO Logo"
          className="absolute"
        />
        <div className="w-[50%] flex items-center justify-start z-10">
          <h1 className="text-7xl font-bold gradient-text uppercase">
            Council of Student Organizations
          </h1>
        </div>
        <div className="w-[50%] flex items-center justify-start z-10">
          <p className="font-semibold gradient-text-light text-3xl text-justify">
            The Council of Student Organizations (CSO) of De La Salle University
            is the union of the professional, special interest, and socio-civic
            organizations in the university. Since 1974, the Council has
            continuously delivered quality student service and produced
            outstanding student leaders devoted to serving the Lasallian
            community. The council pushes forward with its various annual
            activities to promote Lasallian spirit and encourage organizational
            participation.
          </p>
        </div>
        <div className="w-[50%] flex flex-col items-start justify-center z-10 font-bold gradient-text text-xl">
          <p>48 Organizations</p>
          <p> 9 Executive Teams</p>
          <p> 1 CSO</p>
        </div>
      </section>
      <section className="section2 flex gap-10">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="w-1/3 p-10 gradient-background rounded-3xl flex flex-col gap-16 items-start justify-center"
          >
            <div className="w-full flex flex-col">
              <p className="text-9xl font-bold text-white/50">
                {branch.branch_abv}
              </p>
              <p className="text-5xl gradient-text-light uppercase font-semibold">
                {branch.branch_name}
              </p>
            </div>
            <div className="w-full flex flex-col gap-6">
              {branch.committees.map((comm, index) => (
                <div
                  key={index}
                  className="flex gap-10 justify-between items-center font-bold text-gray-300"
                >
                  <p className="">{comm.committee_name}</p>
                  <p className="text-4xl font-bold text-gray-100">
                    {comm.committee_abv}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="w-full min-h-screen p-10 flex items-center justify-center">
        <div className="w-full min-h-screen p-24 gradient-background-light shadow-inner">
          <h1 className="w-full flex justify-center text-5xl uppercase font-black text-gray-500">
            Pertinent Links
          </h1>
          <div>
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
      </section>
    </main>
  );
};

export default About;
