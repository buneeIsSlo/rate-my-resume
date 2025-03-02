import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="font-[besley] text-2xl text-rose-500">Review your CV</h1>
      <Button variant={"secondary"} size={"lg"}>
        LFG
      </Button>
      <p className="font-[mono] text-lg">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
        nulla.
      </p>
    </div>
  );
}
