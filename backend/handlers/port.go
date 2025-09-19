package handlers

import (
    "context"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    
    "portfolio-backend/models"
)

type PortfolioHandler struct {
    collection *mongo.Collection
}

func NewPortfolioHandler(db *mongo.Database) *PortfolioHandler {
    return &PortfolioHandler{
        collection: db.Collection("portfolio"),
    }
}

func (h *PortfolioHandler) GetPortfolio(c *gin.Context) {
    var portfolio models.Portfolio
    
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    
    err := h.collection.FindOne(ctx, bson.M{}).Decode(&portfolio)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            // Return default portfolio if none exists
            defaultPortfolio := models.Portfolio{
                Name:     "Your Name",
                Title:    "Software Engineer & ML Specialist",
                Email:    "your.email@example.com",
                LinkedIn: "linkedin.com/in/yourprofile",
                GitHub:   "github.com/yourusername",
                Projects: []models.Project{
                    {
                        ID:       "1",
                        Title:    "Cloud-Native Personal Portfolio Website",
                        Duration: "January 2024 – Present",
                        Points: []string{
                            "Implemented backend server in Go, offering efficient horizontal scaling",
                            "Utilized Docker to containerize services, streamlining deployment",
                        },
                        Skills: []string{"React", "Go", "Docker", "AWS ECS", "MongoDB"},
                    },
                },
                UpdatedAt: time.Now(),
            }
            c.JSON(http.StatusOK, defaultPortfolio)
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch portfolio"})
        return
    }
    
    c.JSON(http.StatusOK, portfolio)
}

func (h *PortfolioHandler) UpdatePortfolio(c *gin.Context) {
    var portfolio models.Portfolio
    if err := c.ShouldBindJSON(&portfolio); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    portfolio.UpdatedAt = time.Now()
    
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    
    filter := bson.M{}
    opts := options.Replace().SetUpsert(true)
    
    _, err := h.collection.ReplaceOne(ctx, filter, portfolio, opts)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update portfolio"})
        return
    }
    
    c.JSON(http.StatusOK, portfolio)
}