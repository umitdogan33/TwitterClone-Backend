const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utilities/helper");
const uuid = require("uuid")
const events = require("events")
const path = require("path");
const eventEmitter = require("../scripts/events/eventEmitter");
const nodemailer = require("nodemailer");
const uploadHelper = require("../scripts/utilities/uploads");
const UserService = require("../services/Users");
const service = new UserService();
const ErrorResult = require("../scripts/utilities/results/ErrorResult");
class User {
    create(req, res) {
        req.body.password = passwordToHash(req.body.password)
        service.insert(req.body).then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            })
    }

    login(req, res) {
        req.body.password = passwordToHash(req.body.password)
        service.read(req.body).then((response) => {
            if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle Bir Kullanıcı Bulunamadı" })

            response = {
                ...response.toObject(),
                tokens: {
                    access_token: generateAccessToken(response),
                    refresh_token: generateRefreshToken(response)
                },
            };
            delete response.password;

            res.status(httpStatus.OK).send(response)
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            })
    }

    index(req, res) {
        service.list().then((response) => {
            res.status(httpStatus.OK).send(response);
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            })

    }

    resetPassword(req, res) {
        const new_password = uuid.v4()?.split("-")[0] || new Date().getTime();
        service.modify({ email: req.body.email }, { password: passwordToHash(new_password) }).then((response) => {
            if (!response) {
                return res.status(httpStatus.NOT_FOUND).send({ error: "böyle bir kullanıcı bulunmamaktadır" })
            }

            eventEmitter.emit("send_email", {
                to: req.body.email,
                subject: "Şifre Sıfırlama", // Subject line
                html: `Şifre Sıfırlandı<br/>Yeni Şifre<br/><b>Şifre:${new_password}</b>`, // html body
            })

            res.status(httpStatus.OK).send("isteğiniz üzerine sıfırlama işlemi oluşmuştur epastaya bak");

        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
    }

    update(req, res) {
        service.modify({ id: req.user?._id }, req.body).then((response) => {
            res.status(httpStatus.OK).send(response)
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send("e");
            })
    }

    deleteUser(req, res) {
        if (!req.params?.id) {
            res.status(httpStatus.BAD_REQUEST).send("id gönderilmedi");
        }

        service.remove(req.params?.id).then((response) => {
            if (!response) {
                res.status(httpStatus.NOT_FOUND).send("böyle bir kullanıcı bulunmamaktadır")
            }
            res.status(httpStatus.OK).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
    }

    changePassword(req, res) {
        req.body.password = passwordToHash(req.body.password);
        service.modify({ id: req.user?._id }, req.body).then((response) => {
            res.status(httpStatus.OK).send(response)
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send("e");
            })
    }


    updateProfileImage(req, res) {
        const filePath = uploadHelper("users", req, res);

        service.modify({ _id: req.user._id }, { profil_image: filePath }).then((response) => {
            res.status(httpStatus.OK).send(response);
        })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);

            })
    }

    addRoles(req, res) {
        let userId = req.params.id;
        service.read({ id: userId }).then((response) => {
            req.body.roles.forEach(role => {
                response.roles.push(role);
            });

            response.save().then((response) => {
                res.status(httpStatus.OK).send(response);
            }).catch((e) => {
                return next(new ApiError(e?.message, httpStatus.BAD_REQUEST));
            })
        }).catch((e) => {
            return next(new ApiError(e?.message, httpStatus.BAD_REQUEST));
        })
    }

    deleteRoles(req, res) {
        let userId = req.params.userId;
        service.readById(userId).then((response) => {
            const deletedData = response.roles.find(data => data == req.params.roleId);
            const dataIndex = response.roles.findIndex(deletedData);
            response.roles.splice(dataIndex, dataIndex);

            service.modify(response, response._id).then((newRes) => {
                res.status(httpStatus.OK).send(new SuccessResult("Rol Silindi"));
            }).catch((err2) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("Rol Silinemedi"));
            })
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("Rol Silinemedi"));
        })
    }

    findUserByUsername(req, res) {
        const userNameData = req.params.userName
        const query = "/" + userNameData + "/"
        service.searchFunc(userNameData).then((response) => {
            if (req.user != null) {
                response.map((row) => {
                    row.blockedFriends.map((rowdata) => {
                        if (rowdata == req.user) {
                            response.splice(row, row);
                        }
                    })
                })
            }
            res.status(httpStatus.OK).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        })
    }

    blockUser(req, res) {
        const UserId = req.body.userId;
        const UserId2 = req.user._id;
        service.readById(UserId).then((response) => {
            if (response == null) {
                res.status(httpStatus.NOT_FOUND).send(new ErrorResult("Kullanıcı Bulunamadı"));
            }

            service.readById(UserId2).then((response2) => {
                console.log("response2",response)
                if (response2 == null) {
                    res.status(httpStatus.NOT_FOUND).send(new ErrorResult("Kullanıcı Bulunamadı"));
                }
                response2.blockedFriends.push(response);

                response2.save().then((data) => {
                    // res.status(httpStatus.OK).send(new SuccessResult("Kullanıcı Engelleme İşlemi Başarılı"));
                }).catch((err) => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("Kullanıcı Engelleme İşlemi Başarısız"));
                })
                 res.status(httpStatus.OK).send(new SuccessResult("Kullanıcı Engelleme İşlemi Başarılı"));
            }).catch((err2) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("Kullanıcı Engelleme İşlemi Başarılı"));
            })
        }).catch((err3) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("Kullanıcı Bulunamadı"));
        })

    }
}
module.exports = new User();
