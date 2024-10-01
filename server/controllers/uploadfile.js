const multer = require('multer')
const path = require('path')

const cases = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/cases/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const site = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/site/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const equipment = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/equipment/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const review = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/review/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const factory = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/factory/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const three = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/three_d/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const attach_file = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/attach/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const rental = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/rental/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const solution = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/cases/solution/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const participant = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/participant/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|mp4|mov|avi|/; // Add audio file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Image, video files only!');
  }
}

const upload_cases = multer(
  {
    storage: cases,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })
const upload_participant = multer(
  {
    storage: participant,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })
const upload_site = multer(
  {
    storage: site,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })
const upload_equipment = multer({ storage: equipment })
const upload_factory = multer(
  {
    storage: factory,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })
const upload_review = multer({ storage: review })
const upload_three = multer(
  {
    storage: three,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })

const upload_solution = multer(
  {
    storage: solution,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })

const upload_attach = multer(
  {
    storage: attach_file,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })
const upload_rental = multer(
  {
    storage: rental,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })

module.exports = { upload_cases, upload_participant, upload_equipment, upload_factory, upload_review, upload_site, upload_three, upload_attach, upload_solution, upload_rental }