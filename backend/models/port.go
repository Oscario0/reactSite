package models

import (
    "time"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type Portfolio struct {
    ID       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
    Name     string            `json:"name" bson:"name"`
    Title    string            `json:"title" bson:"title"`
    Email    string            `json:"email" bson:"email"`
    LinkedIn string            `json:"linkedin" bson:"linkedin"`
    GitHub   string            `json:"github" bson:"github"`
    Projects []Project         `json:"projects" bson:"projects"`
    UpdatedAt time.Time        `json:"updated_at" bson:"updated_at"`
}

type Project struct {
    ID       string   `json:"id" bson:"id"`
    Title    string   `json:"title" bson:"title"`
    Duration string   `json:"duration" bson:"duration"`
    Points   []string `json:"points" bson:"points"`
    Skills   []string `json:"skills" bson:"skills"`
}