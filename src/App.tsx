import "/src/assets/css/styles.css";
import { useState, useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import SettingsPaste from "./components/SettingsPaste";
import ViewPaste from "./components/ViewPaste";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Toast
import { toast } from "sonner";

function App() {
  const [visibility, setVisibility] = useState(
    localStorage.getItem("visibility") ?? "no"
  );
  const [syntax, setSyntax] = useState(
    localStorage.getItem("syntax") ?? "private"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("visibility", visibility);
    localStorage.setItem("syntax", syntax);

    toast("Settings Updated", {
      description: "Your settings have been updated",
      action: {
        label: "close",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const [pasteId, setPasteId] = useState<string>("");

  useEffect(() => {
    const url = window.location.href;
    const lastSlashIndex = url.lastIndexOf("/");
    const extractedValue = url.substring(lastSlashIndex + 1);
    setPasteId(extractedValue);
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          className: "text-left",
        }}
      />
      <div className="flex justify-between">
        <nav className="flex items-baseline">
          <a href="/" className="font-bold text-2xl">
            Probin
          </a>
        </nav>
        <div className="flex">
          <Button
            className="mr-3"
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            <FontAwesomeIcon className="mr-1.5 mt-0.5" icon={faPlus} /> New
            Paste
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <FontAwesomeIcon icon={faGear} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Personalize your experience on our site.
                </SheetDescription>
              </SheetHeader>
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div>
                  <Label className="text-right">Default Syntax</Label>
                  <Select
                    defaultValue={syntax}
                    onValueChange={(value: string) => setSyntax(value)}
                  >
                    <SelectTrigger id="syntax">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="no">No Syntax</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSS">CSS</SelectItem>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="XML">XML</SelectItem>
                      <SelectItem value="SQL">SQL</SelectItem>
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-right">Default Visibility</Label>
                  <Select
                    defaultValue={visibility}
                    onValueChange={(value: string) => setVisibility(value)}
                  >
                    <SelectTrigger id="visibility">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Save changes
                  </Button>
                </SheetClose>
              </form>
              <Separator />
              <div className="flex py-4 gap-4">
                <Button
                  onClick={() =>
                    window.open(
                      "https://zacharyuhc.fr/projects/probin.html",
                      "_blank"
                    )
                  }
                  className="w-full"
                  variant="secondary"
                >
                  About Probin
                </Button>
                <Button
                  onClick={() =>
                    window.open("https://github.com/Sn1ppr/Probin", "_blank")
                  }
                  variant="secondary"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex mt-10 text-left">
        {pasteId == "" ? <SettingsPaste /> : <ViewPaste />}
      </div>
    </>
  );
}

export default App;
