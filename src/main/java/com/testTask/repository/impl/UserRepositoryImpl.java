package com.testTask.repository.impl;

import com.testTask.db.tables.records.UserRecord;
import com.testTask.entity.User;
import com.testTask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

import static com.testTask.db.tables.User.USER;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserRepositoryImpl implements UserRepository {

    private final DSLContext dsl;

    private Long insert(User user) {
        UserRecord usersRecord = dsl.insertInto(USER, USER.LOGIN, USER.NICK, USER.PASSWORD, USER.CREATED_AT)
                .values(user.getLogin(), user.getNick(), user.getPassword(), user.getCreateAt())
                .returning(USER.ID)
                .fetchOne();
        log.info("Insert into db: {}", user.toString());
        return usersRecord.getValue(USER.ID);
    }

    @Override
    public Long createUser(User user) {
        log.info("Create user: {}", user.toString());
        return insert(user);
    }

    @Override
    public User getUserById(Long userId) {
        log.info("Select user by id {}", userId);
        return dsl.selectFrom(USER)
                .where(USER.ID.eq(userId))
                .fetchOne(r -> new User(
                        r.get(USER.ID, Long.class),
                        r.get(USER.LOGIN, String.class),
                        r.get(USER.PASSWORD, String.class),
                        r.get(USER.NICK, String.class),
                        r.get(USER.CREATED_AT, Timestamp.class)
                ));
    }

    @Override
    public User getUserByLogin(String userLogin) {
        log.info("Select user by id {}", userLogin);
        User user = dsl.selectFrom(USER)
                .where(USER.LOGIN.eq(userLogin))
                .fetchOne(r -> new User(
                        r.get(USER.ID, Long.class),
                        r.get(USER.LOGIN, String.class),
                        r.get(USER.PASSWORD, String.class),
                        r.get(USER.NICK, String.class),
                        r.get(USER.CREATED_AT, Timestamp.class)
                ));
        return new User(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                user.getNick(),
                user.getCreateAt());
    }

    @Override
    public User updateUser(User user) {
        log.info("Update text user: {}", user.toString());
        return getUserById((long) dsl.update(USER)
                .set(USER.LOGIN, user.getLogin())
                .set(USER.NICK, user.getNick())
                .set(USER.PASSWORD, user.getPassword())
                .where(USER.ID.eq(user.getId())).execute());
    }

    @Override
    public void removeUser(Long userId) {
        log.info("Remove user: {}", userId);
        dsl.deleteFrom(USER)
                .where(USER.ID.eq(userId))
                .execute();
    }
}
