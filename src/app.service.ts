import { Injectable } from '@nestjs/common'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!'
  }

  client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET

  async uploadFile(file) {
    console.log(file)
    const { originalname } = file
    const command = new PutObjectCommand({
      Bucket: this.AWS_S3_BUCKET,
      Key: originalname,
      Body: file.buffer,
    })

    try {
      const response = await this.client.send(command)
      console.log(response)
      return response
    } catch (err) {
      console.error(err)
    }
  }

  // async s3_upload(file, bucket, name, mimetype) {
  //   const params = {
  //     Bucket: bucket,
  //     Key: String(name),
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: mimetype,
  //     ContentDisposition: 'inline',
  //     CreateBucketConfiguration: {
  //       LocationConstraint: 'ap-south-1',
  //     },
  //   }

  //   try {
  //     const s3Response = await this.s3.upload(params).promise()
  //     return s3Response
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
