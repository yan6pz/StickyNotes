<?php

abstract class BaseModel {
    public $database;
    public function __construct() {
        $this->database = new PDO("mysql:host=localhost:3307;dbname=stickynotes", "root", "password");
    }
}