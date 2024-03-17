import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

// Toast
import { toast } from "sonner";

// React Ace
import AceEditor from "react-ace";

// Supabase
import { supabase } from "../supabase/supabaseClient";

// Analytics
import { Analytics } from "@vercel/analytics/react"

function ViewPaste() {
  const [pastes, setPastes] = useState<any[] | null>(null);
  const { pasteId } = useParams();
  const [, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("pastes")
          .select()
          .eq("id", pasteId);

        if (error) {
          throw new Error(error.message);
        }

        setPastes(data || []);
      } catch (error) {
        console.error("Error fetching pastes:", error);
      }
    }

    if (pasteId) {
      fetchData();
    }
  }, [pasteId]);

  const handleCopyClick = () => {
    const textToCopy =
      "https://probin.xyz/" +
      (pastes ? pastes.map((paste) => paste.id).join("\n") : "");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    toast("Link copied !", {
      description: "The link has been copied to the clipboard",
    });
  };
  return (
    <>
    <Analytics/>
      <Toaster
        toastOptions={{
          className: "text-left z-50",
        }}
      />
      <Card className="w-[350px]" style={{ height: "-webkit-fill-available" }}>
        <CardContent>
          <div className="grid w-full items-center gap-4 pt-6">
            <div className="flex flex-col space-y-1.5">
              <Label>Title</Label>
              <Input
                id="title"
                value={
                  pastes
                    ? pastes
                        .map((paste: { title: string }) => paste.title)
                        .join("\n")
                    : ""
                }
                readOnly
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4 pt-6">
            <Dialog>
              <DialogTrigger>
                <Button className="w-full">More Info</Button>
              </DialogTrigger>
              <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Paste Info</DialogTitle>
                  <DialogDescription>
                    You can find all the information on the current paste below.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-1.5">
                  <Label>ID</Label>
                  <Input
                    id="title"
                    value={
                      pastes
                        ? pastes
                            .map((paste: { id: string }) => paste.id)
                            .join("\n")
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Syntax</Label>
                  <Input
                    className="capitalize"
                    id="title"
                    value={
                      pastes
                        ? pastes
                            .map((paste: { syntax: string }) =>
                              paste.syntax === "no" ? "No Syntax" : paste.syntax
                            )
                            .join("\n")
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Visibility</Label>
                  <Input
                    className="capitalize"
                    id="title"
                    value={
                      pastes
                        ? pastes
                            .map(
                              (paste: { visibility: string }) =>
                                paste.visibility
                            )
                            .join("\n")
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Time (UTC+1)</Label>
                  <Input
                    className="capitalize"
                    id="title"
                    value={
                      pastes
                        ? pastes
                            .map(
                              (paste: { timestamp: string }) => paste.timestamp
                            )
                            .join("\n")
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Link</Label>
                  <div className="flex gap-2">
                    <Input
                      id="title"
                      value={
                        "https://probin.xyz/" +
                        (pastes
                          ? pastes
                              .map((paste: { id: string }) => paste.id)
                              .join("\n")
                          : "")
                      }
                      readOnly
                    />
                    <Button
                      onClick={handleCopyClick}
                      size="sm"
                      className="px-3"
                    >
                      <span className="sr-only">Copy</span>
                      <FontAwesomeIcon className="h-4 w-4" icon={faCopy} />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="mt-3" />
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant={"secondary"} className="w-full">
            <FontAwesomeIcon icon={faCopy} />
          </Button>
          <Button variant={"secondary"} className="w-full">
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        </CardFooter>
      </Card>
      <Card className="ml-6 w-full">
        <CardContent className="p-0">
          <AceEditor
            className="mt-3 pb-1 pr-1"
            height="75lvh"
            value={
              pastes
                ? pastes
                    .map((paste: { content: string }) => paste.content)
                    .join("\n")
                : ""
            }
            width="100%"
            highlightActiveLine={false}
            setOptions={{
              showLineNumbers: true,
              readOnly: true,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default ViewPaste;
