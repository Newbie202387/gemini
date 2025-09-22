import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { PrismaClient } from '@prisma/client'

// Initialize Prisma Client
const prisma = new PrismaClient()

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions
interface ApplicationData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    linkedinUrl: string;
    portfolioUrl: string;
    jobTitle: string;
    jobDepartment: string;
}

interface AttachmentData {
    filename: string;
    content: string;
    type: string;
    disposition: string;
}

interface EmailTemplateProps {
    data: ApplicationData;
    attachments?: AttachmentData[];
}

// Save uploaded files and return file path
const saveFile = async (file: File, filename: string): Promise<string> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "uploads");
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (error) {
        // Directory might already exist
        console.error("Error creating upload directory:", error);
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    return filePath;
};

// Generate unique filename
const generateFilename = (
    originalName: string,
    applicantName: string
): string => {
    const timestamp = Date.now();
    const cleanName = applicantName.replace(/[^a-zA-Z0-9]/g, "_");
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    return `${cleanName}_${timestamp}_${baseName}${extension}`;
};

// Convert file to base64 for Resend attachment
const fileToBase64 = async (filePath: string): Promise<string> => {
    try {
        const fileBuffer = await readFile(filePath);
        return fileBuffer.toString("base64");
    } catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
};

// Application Email Template (for company)
const ApplicationEmail = ({
    data,
    attachments = [],
}: EmailTemplateProps): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Application</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #06b6d4; padding-bottom: 10px; margin-top: 0;">
            New Job Application Received
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #06b6d4; margin-bottom: 5px;">Position Applied For:</h3>
            <p style="font-size: 18px; font-weight: bold; margin: 0; color: #333;">
              ${data.jobTitle} - ${data.jobDepartment}
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #06b6d4; margin-bottom: 10px;">Applicant Information:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${data.firstName} ${data.lastName
        }</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${data.email
        }" style="color: #06b6d4; text-decoration: none;">
                    ${data.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${data.phone
        }" style="color: #06b6d4; text-decoration: none;">
                    ${data.phone}
                  </a>
                </td>
              </tr>
              ${data.linkedinUrl
            ? `
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px 0; font-weight: bold;">LinkedIn:</td>
                <td style="padding: 8px 0;">
                  <a href="${data.linkedinUrl}" style="color: #06b6d4; text-decoration: none;" target="_blank">
                    View Profile
                  </a>
                </td>
              </tr>
              `
            : ""
        }
              ${data.portfolioUrl
            ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Portfolio:</td>
                <td style="padding: 8px 0;">
                  <a href="${data.portfolioUrl}" style="color: #06b6d4; text-decoration: none;" target="_blank">
                    View Portfolio
                  </a>
                </td>
              </tr>
              `
            : ""
        }
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #06b6d4; margin-bottom: 10px;">Cover Letter:</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4; line-height: 1.6;">
              ${data.coverLetter.replace(/\n/g, "<br>")}
            </div>
          </div>

          ${attachments.length > 0
            ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #06b6d4; margin-bottom: 10px;">Attachments:</h3>
            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #bae6fd;">
              ${attachments
                .map(
                    (attachment) => `
                <div style="padding: 8px 0; border-bottom: 1px solid #e0f2fe;">
                  <span style="margin-right: 8px;">📎</span>
                  <span style="color: #333; font-weight: 500;">${attachment.filename}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
            : ""
        }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 14px; color: #666; text-align: center;">
              Application submitted on ${new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        )} at ${new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })}
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #999; text-align: center;">
              Sent via Gemini Pixel Craft Careers Portal
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Confirmation Email Template (for applicant)
const ConfirmationEmail = ({ data }: { data: ApplicationData }): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Confirmation</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- Header with Logo Area -->
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #06b6d4;">
            <h1 style="color: #333; margin: 0; font-size: 24px;">Gemini Pixel Craft</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Application Confirmation</p>
          </div>
          
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
            Dear ${data.firstName},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
            Thank you for your interest in joining our team! We've successfully received your application for the 
            <strong style="color: #06b6d4;">${data.jobTitle
        }</strong> position and wanted to confirm that it's been 
            added to our review process.
          </p>

          <!-- Application Summary Box -->
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #06b6d4; margin: 25px 0;">
            <h3 style="color: #06b6d4; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Application Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #333; width: 100px;">Position:</td>
                <td style="padding: 5px 0; color: #666;">${data.jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #333;">Department:</td>
                <td style="padding: 5px 0; color: #666;">${data.jobDepartment
        }</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #333;">Submitted:</td>
                <td style="padding: 5px 0; color: #666;">${new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        )}</td>
              </tr>
            </table>
          </div>

          <!-- Next Steps -->
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 18px;">What happens next?</h3>
            <div style="color: #475569; line-height: 1.6;">
              <p style="margin: 0 0 12px 0;"><strong style="color: #06b6d4;">1.</strong> Our hiring team will carefully review your application and qualifications</p>
              <p style="margin: 0 0 12px 0;"><strong style="color: #06b6d4;">2.</strong> If your background matches our requirements, we'll contact you within 5-7 business days</p>
              <p style="margin: 0;"><strong style="color: #06b6d4;">3.</strong> We'll keep you informed throughout the entire process</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #fefefe; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; margin: 25px 0;">
            <h3 style="color: #374151; margin-top: 0; margin-bottom: 10px; font-size: 16px;">Have questions?</h3>
            <p style="color: #6b7280; line-height: 1.6; margin: 0;">
              If you have any questions about your application or the position, feel free to reach out to us at 
              <a href="mailto:careers@geminipixelcraft.com" style="color: #06b6d4; text-decoration: none; font-weight: 500;">
                careers@geminipixelcraft.com
              </a>
            </p>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
            We're excited about the possibility of you joining our team and look forward to learning more about your experience!
          </p>

          <p style="font-size: 16px; color: #333; margin: 25px 0 30px 0;">
            Best regards,<br>
            <strong style="color: #06b6d4;">The Gemini Pixel Craft Team</strong>
          </p>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">
              <strong>Gemini Pixel Craft</strong> | Creating exceptional digital experiences
            </p>
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        console.log("Processing job application...");

        const formData = await request.formData();

        // Extract form data with proper type checking
        const applicationData: ApplicationData = {
            firstName: (formData.get("firstName") as string)?.trim() || "",
            lastName: (formData.get("lastName") as string)?.trim() || "",
            email: (formData.get("email") as string)?.trim() || "",
            phone: (formData.get("phone") as string)?.trim() || "",
            coverLetter: (formData.get("coverLetter") as string)?.trim() || "",
            linkedinUrl: (formData.get("linkedinUrl") as string)?.trim() || "",
            portfolioUrl: (formData.get("portfolioUrl") as string)?.trim() || "",
            jobTitle: (formData.get("jobTitle") as string)?.trim() || "",
            jobDepartment: (formData.get("jobDepartment") as string)?.trim() || "",
        };

        console.log("Application data extracted:", {
            ...applicationData,
            coverLetter: applicationData.coverLetter.substring(0, 100) + "...",
        });

        // Validate required fields
        const requiredFields: (keyof ApplicationData)[] = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "coverLetter",
            "jobTitle",
        ];
        for (const field of requiredFields) {
            if (!applicationData[field]) {
                console.error(`Missing required field: ${field}`);
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(applicationData.email)) {
            console.error("Invalid email format:", applicationData.email);
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Process file uploads and get file paths for database
        let resumePath: string | null = null;
        let portfolioPath: string | null = null;
        const attachments: AttachmentData[] = [];

        // Process resume
        const resume = formData.get("resume") as File | null;
        if (resume && resume instanceof File && resume.size > 0) {
            try {
                console.log("Processing resume upload:", resume.name);
                const resumeFilename = generateFilename(
                    resume.name,
                    `${applicationData.firstName}_${applicationData.lastName}`
                );
                resumePath = await saveFile(resume, resumeFilename);
                const resumeBase64 = await fileToBase64(resumePath);

                attachments.push({
                    filename: resume.name,
                    content: resumeBase64,
                    type: resume.type || "application/octet-stream",
                    disposition: "attachment",
                });

                console.log("Resume processed successfully, saved to:", resumePath);
            } catch (error) {
                console.error("Error processing resume:", error);
                return NextResponse.json(
                    { error: "Failed to process resume upload" },
                    { status: 500 }
                );
            }
        }

        // Process portfolio (optional)
        const portfolio = formData.get("portfolio") as File | null;
        if (portfolio && portfolio instanceof File && portfolio.size > 0) {
            try {
                console.log("Processing portfolio upload:", portfolio.name);
                const portfolioFilename = generateFilename(
                    portfolio.name,
                    `${applicationData.firstName}_${applicationData.lastName}`
                );
                portfolioPath = await saveFile(portfolio, portfolioFilename);
                const portfolioBase64 = await fileToBase64(portfolioPath);

                attachments.push({
                    filename: portfolio.name,
                    content: portfolioBase64,
                    type: portfolio.type || "application/octet-stream",
                    disposition: "attachment",
                });

                console.log(
                    "Portfolio processed successfully, saved to:",
                    portfolioPath
                );
            } catch (error) {
                console.error("Error processing portfolio:", error);
                // Don't fail the entire request for optional portfolio
            }
        }

        // ✅ NEW: Save application to database
        console.log("Saving application to database...");
        let dbApplication;
        try {
            dbApplication = await prisma.jobApplication.create({
                data: {
                    firstName: applicationData.firstName,
                    lastName: applicationData.lastName,
                    email: applicationData.email,
                    phone: applicationData.phone,
                    coverLetter: applicationData.coverLetter,
                    linkedinUrl: applicationData.linkedinUrl || null,
                    portfolioUrl: applicationData.portfolioUrl || null,
                    jobTitle: applicationData.jobTitle,
                    jobDepartment: applicationData.jobDepartment,
                    resumePath: resumePath,
                    portfolioPath: portfolioPath,
                    status: "PENDING", // Default status
                },
            });
            console.log("Application saved to database with ID:", dbApplication.id);
        } catch (dbError) {
            console.error("Error saving to database:", dbError);
            return NextResponse.json(
                { error: "Failed to save application to database" },
                { status: 500 }
            );
        }

        // Check Resend API key
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY environment variable is not set");
            // Still return success since data is saved to database
            return NextResponse.json(
                {
                    message:
                        "Application submitted successfully (email notifications disabled)",
                    applicationId: dbApplication.id,
                    applicant: `${applicationData.firstName} ${applicationData.lastName}`,
                },
                { status: 200 }
            );
        }

        // Send application email to company
        const fromEmail =
            process.env.FROM_EMAIL || "do_not_reply@geminipixelcraft.com";
        const companyEmail =
            process.env.COMPANY_EMAIL ||
            process.env.FROM_EMAIL ||
            "careers@geminipixelcraft.com";

        console.log("Sending application email...");
        let applicationEmailResult;
        try {
            applicationEmailResult = await resend.emails.send({
                from: fromEmail,
                to: [companyEmail],
                subject: `New Application: ${applicationData.jobTitle} - ${applicationData.firstName} ${applicationData.lastName}`,
                html: ApplicationEmail({ data: applicationData, attachments }),
                attachments: attachments.map((attachment) => ({
                    filename: attachment.filename,
                    content: attachment.content,
                })),
                tags: [
                    { name: "category", value: "job-application" },
                    { name: "application_id", value: dbApplication.id },
                ],
            });

            if (applicationEmailResult.error) {
                console.error(
                    "Error sending application email:",
                    applicationEmailResult.error
                );
                // Don't fail the request if email fails
            } else {
                console.log(
                    "Application email sent successfully, ID:",
                    applicationEmailResult.data?.id
                );
            }
        } catch (emailError) {
            console.error("Error sending application email:", emailError);
            // Continue even if email fails
        }

        // Send confirmation email to applicant
        console.log("Sending confirmation email...");
        let confirmationEmailResult;
        try {
            confirmationEmailResult = await resend.emails.send({
                from: fromEmail,
                to: [applicationData.email],
                subject: `Application Confirmation - ${applicationData.jobTitle} Position at Gemini Pixel Craft`,
                html: ConfirmationEmail({ data: applicationData }),
                tags: [
                    { name: "category", value: "confirmation" },
                    { name: "application_id", value: dbApplication.id },
                ],
            });

            if (confirmationEmailResult.error) {
                console.error(
                    "Error sending confirmation email:",
                    confirmationEmailResult.error
                );
            } else {
                console.log(
                    "Confirmation email sent successfully, ID:",
                    confirmationEmailResult.data?.id
                );
            }
        } catch (confirmationError) {
            console.error("Error sending confirmation email:", confirmationError);
        }

        // ✅ Return success response with database ID
        return NextResponse.json(
            {
                message: "Application submitted successfully",
                applicationId: dbApplication.id,
                applicant: `${applicationData.firstName} ${applicationData.lastName}`,
                applicationEmailId: applicationEmailResult?.data?.id,
                confirmationEmailId: confirmationEmailResult?.data?.id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing application:", error);
        return NextResponse.json(
            { error: "Failed to process application. Please try again." },
            { status: 500 }
        );
    }
}

// ✅ NEW: Add GET endpoint to retrieve applications (for admin panel)
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Add basic authentication/authorization check here
        const url = new URL(request.url);
        const action = url.searchParams.get("action");

        if (action === "list") {
            // Get all applications (add pagination in production)
            const applications = await prisma.jobApplication.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    jobTitle: true,
                    jobDepartment: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 100, // Limit results
            });

            return NextResponse.json({ applications });
        }

        // Get specific application by ID
        const applicationId = url.searchParams.get("id");
        if (applicationId) {
            const application = await prisma.jobApplication.findUnique({
                where: { id: applicationId },
            });

            if (!application) {
                return NextResponse.json(
                    { error: "Application not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ application });
        }

        return NextResponse.json(
            { error: "Specify action or application ID" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error retrieving applications:", error);
        return NextResponse.json(
            { error: "Failed to retrieve applications" },
            { status: 500 }
        );
    }
}
