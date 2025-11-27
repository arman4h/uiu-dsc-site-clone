import { Link } from "@tanstack/react-router";

export default function Joinclub() {
  return (
    <>
      {/* CTA Section */}
      <section className=" px-6 py-20 mb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-cyan-500">
            Join Our Club Today
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Become a part of UIU Data Science Club and embark on an exciting
            journey into the world of data science.
          </p>
          <Link
            to="/"
            className="text-white w-auto mx-auto bg-cyan-500 border border-cyan-200/40 px-8 py-2 rounded-xl text-sm hover:bg-cyan-600 "
          >
            Register Now
          </Link>
        </div>
      </section>
    </>
  )
}
