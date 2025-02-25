import "./about-styles.css";

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

  return (
    <main className="w-full min-h-screen py-10 flex flex-col items-center justify-center gradient-background-light">
      <section className="section1">
        {/* <Image
          width={1200}
          height={700}
          src="/cso-logo-white.png"
          alt="CSO Logo"
          className="z-0 translate-x-[800px] overflow-x-hidden"
        /> */}
        <div className="cso-heading gradient-text">
          <h1>Council of Student Organizations</h1>
          <hr className="border-4 bg-clip-border bg-primary/70 border-transparent" />
        </div>
        <div className="cso-summary gradient-background">
          The Council of Student Organizations (CSO) of De La Salle University
          is the union of the professional, special interest, and socio-civic
          organizations in the university. Since 1974, the Council has
          continuously delivered quality student service and produced
          outstanding student leaders devoted to serving the Lasallian
          community. The council pushes forward with its various annual
          activities to promote Lasallian spirit and encourage organizational
          participation.
        </div>
        <div>
          <p>48 Organizations</p>
          <p> 9 Executive Teams</p>
          <p> 1 CSO</p>
        </div>
      </section>
      <section className="section2 flex flex-col gap-10">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="w-[60%] bg-gradient-to-br from-white to-primary p-10 flex items-center justify-between shadow-inner rounded-r-2xl"
          >
            <div>
              <p className="text-9xl font-bold gradient-text">
                {branch.branch_abv}
              </p>
              <p className="uppercase font-semibold text-gray-600">
                {branch.branch_name}
              </p>
            </div>
            <div className="w-1/2">
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
    </main>
  );
};

export default About;
