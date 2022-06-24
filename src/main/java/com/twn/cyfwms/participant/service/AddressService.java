package com.twn.cyfwms.participant.service;


import com.twn.cyfwms.participant.entity.Address;
import com.twn.cyfwms.participant.repository.AddressRepository;

import java.util.List;
import java.util.Optional;

public interface AddressService {

    public Address saveOrUpdateAddressData(Address address);
    public Optional<Address> readAddressData(Long addressId);
    public List<Address> searchAllByParticipant(Long participantId);
}
