export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) callback(new Error('File is Empty'), false);

const fileExptension = file.mimetype.split('/')[1]

const validExptension = ['jpeg','png','gif']


if(validExptension.includes(fileExptension)){


    callback(null, true)
}
callback(null, false)


};
