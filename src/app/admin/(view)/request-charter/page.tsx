import CharterForm from "./charter-form";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Add Charter Request</h1>
          <p>Manually enter a new private charter request from a client</p>
        </div>
      </div>
      <div className="bg-secondary w-1/2 mx-auto! rounded-md mt-6!">
        <CharterForm />
      </div>
    </section>
  );
}
