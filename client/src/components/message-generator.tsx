"use client"

import type React from "react"
import { useState } from "react"
import type { LinkedInProfile } from "../types/index"
import { generatePersonalizedMessage } from "../services/api"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "../hooks/use-toast"

const MessageGenerator: React.FC = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [generatedMessage, setGeneratedMessage] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "Dr. L R Sharma",
    job_title: "Ceo And Founder",
    company: "Natural Bio Products LLC ",
    location: "California, US",
    summary: "We are in the process of creating a world class corporation in NBL which will be known for its contribution for reaching every nook and corner of the world with its organic wellness products made out of toxin free fruit pulp of Seabuckthorn from Great Himalayas.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const response = await generatePersonalizedMessage(profile)
      setGeneratedMessage(response.message)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate message")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate personalized message",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Profile Data</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="job_title" className="text-sm font-medium">
                Job Title
              </label>
              <Input
                id="job_title"
                name="job_title"
                value={profile.job_title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company
              </label>
              <Input
                id="company"
                name="company"
                value={profile.company}
                onChange={handleChange}
                placeholder="Enter company"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="summary" className="text-sm font-medium">
                Profile Summary
              </label>
              <Textarea
                id="summary"
                name="summary"
                value={profile.summary}
                onChange={handleChange}
                placeholder="Enter profile summary"
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Generating..." : "Generate Message"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Message</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="p-4 border rounded-md bg-destructive/10 text-destructive">
              <p>{error}</p>
            </div>
          ) : generatedMessage ? (
            <div className="p-4 border rounded-md bg-muted">
              <p className="whitespace-pre-wrap">{generatedMessage}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Character count: {generatedMessage.length} 
                {generatedMessage.length > 300 && 
                  <span className="text-destructive"> (exceeds LinkedIn's 300 character limit)</span>
                }
              </p>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>
                Fill in the LinkedIn profile data and click "Generate Message" to create a personalized outreach
                message.
              </p>
            </div>
          )}
        </CardContent>
        {generatedMessage && !loading && !error && (
          <CardFooter className="flex flex-col space-y-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedMessage)
                toast({
                  title: "Copied!",
                  description: "Message copied to clipboard",
                })
              }}
              variant="outline"
              className="w-full"
            >
              Copy to Clipboard
            </Button>
            {generatedMessage.length > 300 && (
              <Button
                onClick={async () => {
                  try {
                    setLoading(true)
                    const shorterProfile = {
                      ...profile,
                      summary: profile.summary + " Please make the message shorter, under 300 characters."
                    }
                    const response = await generatePersonalizedMessage(shorterProfile)
                    setGeneratedMessage(response.message)
                    toast({
                      title: "Success",
                      description: "Generated a shorter message",
                    })
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to generate shorter message",
                      variant: "destructive",
                    })
                  } finally {
                    setLoading(false)
                  }
                }}
                variant="secondary"
                className="w-full"
              >
                Generate Shorter Version
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default MessageGenerator