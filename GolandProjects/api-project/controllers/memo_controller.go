package controllers

import (
	"api-project/service"
	"github.com/gin-gonic/gin"
)

type MemoController struct {
	Service *service.MemoService
}

func NewMemoController(service *service.MemoService) *MemoController {
	return &MemoController{Service: service}
}

func (c *MemoController) GetList(ctx *gin.Context) {

}

func (c *MemoController) Create(ctx *gin.Context) {

}

func (c *MemoController) Update(ctx *gin.Context) {

}

func (c *MemoController) Delete(ctx *gin.Context) {

}
