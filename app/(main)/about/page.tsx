import { getPertinentLinks } from "@/libs/contentful/services/pertinent.services";
import "./about-styles.css";
import Image from "next/image";

const About = async () => {
  const pertinent = await getPertinentLinks();
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
  const categories = pertinent?.map((pertinentLink) => pertinentLink.category);
  const uniqueCategories = [...new Set(categories)];
  const pertinentLinks = uniqueCategories.map((category) => {
    const links = pertinent
      ?.map((link) => {
        if (link.category === category) {
          return {
            name: link.title,
            url: link.link,
          };
        }
      })
      .filter(Boolean);
    return {
      header: category,
      links,
    };
  });
  // const pertinentLinks = [
  //   {
  //     header: "PNP",
  //     links: [
  //       {
  //         name: "FAQs",
  //         url: "bit.ly.PNPFAQs",
  //       },
  //     ],
  //   },
  //   {
  //     header: "MNL",
  //     links: [
  //       {
  //         name: "MOAs",
  //         url: "bit.ly.MOATemplates",
  //       },
  //     ],
  //   },
  // ];
  //
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start gradient-background-light">
      <section className="w-full h-screen md:p-16 grid grid-rows-1 grid-cols-1 place-items-start overflow-hidden">
        <div className="w-full col-start-1 row-start-1 z-0 flex justify-end items-end pb-0 pr-0">
          <Image
            src="/cso-logo-white.png"
            width={1300}
            height={1300}
            alt="CSO Logo"
            className="object-contain translate-x-40 translate-y-20"
          />
        </div>
        <div className="col-start-1 row-start-1 z-10 p-4 md:p-20 w-full h-screen flex flex-col justify-start items-start gap-16">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold font-[Lexend] uppercase gradient-text tracking-wider text-center">
              Council of Student Organizations
            </h1>
            <div className="w-full h-23 gradient-background p-1 drop-shadow-lg"></div>
          </div>
          <div className="w-full max-w-2xl flex flex-col gap-8 text-secondary-30">
            <div className="w-full text-lg md:text-2xl leading-relaxed">
              <p className="mb-6">
                The{" "}
                <span className="font-semibold">
                  Council of Student Organizations (CSO)
                </span>{" "}
                of De La Salle University is the union of the professional,
                special interest, and socio-civic organizations in the
                university.
              </p>
              <p>
                Since 1974, the Council has continuously delivered quality
                student service and produced outstanding student leaders devoted
                to serving the Lasallian community. The council pushes forward
                with its various annual activities to promote Lasallian spirit
                and encourage organizational participation.
              </p>
            </div>
            <div className="text-shadow bg-gradient-to-r from-secondary to-neutral-900 font-bold font-[Lexend] uppercase">
              <p>48 ORGANIZATIONS</p>
              <p>9 EXECUTIVE TEAMS</p>
              <p>1 CSO</p>
            </div>
          </div>
        </div>
      </section>
      <section className="z-10 w-full py-10 md:pr-10 flex flex-col gap-10">
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
        <div className="w-full min-h-screen p-8 md:p-24 gradient-background-light shadow-inner flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold uppercase text-shadow mb-16 tracking-widest bg-black/40">
            Pertinent Links
          </h1>

          <div className="w-full flex flex-col gap-8">
            {pertinentLinks.map((link, key) => (
              <div key={key} className="w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-600 uppercase">
                    {link.header}
                  </h2>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  {link.links?.map((l, linkKey) => (
                    <div
                      key={linkKey}
                      className="w-full flex items-center justify-between gap-4"
                    >
                      <p className="w-[200px] px-6 py-3 border border-gray-300 inner-box-shadow-small">
                        {l?.name}
                      </p>

                      <a
                        href={l?.url}
                        className="grow px-6 py-3 border border-gray-300 inner-box-shadow-small text-gray-600/80 hover:text-gray-600 transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l?.url}
                      </a>
                    </div>
                  ))}
                </div>
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
