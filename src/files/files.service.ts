// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as uuid from 'uuid';
// @Injectable()
// export class FilesService {
//   createFile(file) {
//     try {
//       const fileName = uuid.v4() + '.jpg';
//       const filePath = path.resolve(__dirname, '..', 'static');
//       if (!fs.existsSync(filePath)) {
//         fs.mkdirSync(filePath, { recursive: true });
//       }
//       fs.writeFileSync(path.join(filePath, fileName), file.buffer);
//       return fileName;
//     } catch (error) {
//       throw new HttpException('Mistake!', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }
