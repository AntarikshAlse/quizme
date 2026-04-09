## Assumptions
- Only admin can create quizzes
- Users are anonymous
- No login required for attempts

## Scope
- Quiz CRUD (basic)
- Attempt submission + scoring
- Public quiz access

## Approach
- MongoDB with embedded questions
- Separate Attempt collection
- Stateless API

## Trade-offs
- Embedded questions for simplicity
- No user system to reduce complexity

## Future Improvements
- Add authentication
- Add leaderboard
- Add timer per quiz
- Add quiz categories