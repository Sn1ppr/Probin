import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// React Ace
import AceEditor from "react-ace";
// Supabase
import { supabase } from "../supabase/supabaseClient";

function ViewPaste() {
  const [pastes, setPastes] = useState<any[] | null>(null);
  const [pasteId, setPasteId] = useState<string>("");

  useEffect(() => {
    const url = window.location.href;
    const lastSlashIndex = url.lastIndexOf("/");
    const extractedValue = url.substring(lastSlashIndex + 1);
    setPasteId(extractedValue);
  }, []);

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
  return (
    <>
      <Card className="w-[350px]" style={{ maxHeight: "244px" }}>
        <CardContent>
          <div className="grid w-full items-center gap-4 pt-6">
            <div className="flex flex-col space-y-1.5">
              <Input
                className="focus-visible:ring-0"
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
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button className="w-full">Copy</Button>
          <Button className="w-full">Download</Button>
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
            highlightActiveLine={true}
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
