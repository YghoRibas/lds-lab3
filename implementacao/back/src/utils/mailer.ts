"use strict";
import * as nodemailer from 'nodemailer'

export enum MailType {
  HTML, TEXT
}

export interface MailContent {
  type: MailType;
  subject: string;
  body: string;
}

export async function sendEmail(to: string, { subject, body, type }: MailContent): Promise<string> {
  let account = {
	  user: 'dns.incap@gmail.com',
	  pass: 'qwcpiohwmtagylht'
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
	   ...account,
    }
  });

  let info = await transporter.sendMail({
    from: '"Sistema" <lucas@easy-way.app>',
    to,
    subject,
    ...(type == MailType.HTML && { html: body }),
    ...(type == MailType.TEXT && { text: body })
    ,
  });

  return info.messageId;
}