package com.example.DocumentManagement.controller;

import com.example.DocumentManagement.request.UpdateDocumentRequest;
import com.example.DocumentManagement.response.MessageResponse;
import com.example.DocumentManagement.response.PageResponse;
import com.example.DocumentManagement.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/document")
@RequiredArgsConstructor
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @PostMapping("")
    public ResponseEntity<MessageResponse> createDocument(@RequestBody UpdateDocumentRequest uploadRequest) {
        return ResponseEntity.ok(documentService.createDocument(uploadRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> updateDocument(
            @PathVariable String id,
            @RequestBody UpdateDocumentRequest uploadRequest) {
        return ResponseEntity.ok(documentService.updateDocument(uploadRequest, id));
    }

    @GetMapping("")
    public ResponseEntity<PageResponse> getAllDocuments(
            @RequestParam(name = "page") String page,
            @RequestParam(name = "size") String size
    ) {
        return ResponseEntity.ok(documentService.getAllDocuments(page, size));
    }


}