package com.javatpoint.controller;

import com.javatpoint.dto.PostDTO;
import com.javatpoint.model.Category;
import com.javatpoint.model.Comment;
import com.javatpoint.model.Post;
import com.javatpoint.model.User;
import com.javatpoint.service.CommentRepository;
import com.javatpoint.service.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private CommentRepository commentRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository) {
        this.commentRepository= commentRepository;
    }


    @GetMapping("/get")
    public ResponseEntity<List<Comment>> getComments(){
        try {
            List<Comment> comments= new ArrayList<>();
            commentRepository.findAll().forEach(e->comments.add(e));
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable long id){
        Comment cm = commentRepository.findById(id).orElse(null);
        if(cm != null){
            return new ResponseEntity<>(cm,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Comment> createComment(@RequestBody Comment c){
        try{
            Comment newComment=commentRepository.save(c);
            return new ResponseEntity<>(newComment,HttpStatus.CREATED);

        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping ("/deleteCommentByPost")
    public ResponseEntity deleteCommentByPost(@RequestBody Post p){
        try {
            p.getComment().forEach(e-> commentRepository.deleteById(e.getId()));
            return new ResponseEntity(HttpStatus.OK);

        }
        catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }

//    @DeleteMapping ("/deleteCommentById/{id}")
//    public ResponseEntity deletePostById(@PathVariable long id){
//        commentRepository.deleteById(id);
//        return new ResponseEntity(HttpStatus.OK);
//    }


}
